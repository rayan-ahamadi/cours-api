const { prisma } = require("#prismaORM/prisma.js");
const { normalizeOmdbData } = require("#helpers/omdbHelper.js");
const {
  getOmdbDataByID,
  getOmdbDataBySearch,
} = require("#service/omdb.service.js");
const { trace } = require("#routes/v1/index.js");

const getTitlesByName = async (req, res) => {
  const { name } = req.params;
  try {
    // Interroger l'API OMDB pour les titres correspondant au nom
    const omdbResponse = await getOmdbDataBySearch(name);

    // return res.status(200).json(normalizeOmdbData(omdbResponse.Search[0]));

    if (omdbResponse.Response == "True") {
      // Normaliser et enregistrer chaque titre en base de données
      omdbResponse.Search.forEach(async (item) => {
        const normalizedData = normalizeOmdbData(item);

        // Enregistrer chaque titre en base de données s'il n'existe pas déjà
        await prisma.title.upsert({
          where: { imdbID: normalizedData.imdbID },
          update: { ...normalizedData },
          create: { ...normalizedData },
        });
      });

      // Récupérer les titres enregistrés en base de données
      const titles = await prisma.title.findMany({
        where: {
          title: {
            contains: name,
            mode: "insensitive",
          },
        },
      });

      return res.status(200).json({
        titles: titles,
        totalResults: titles.length,
      });
    } else {
      return res.status(404).json({ message: "No titles found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, trace: error.stack });
  }
};

const getTitleByImdbID = async (req, res) => {
  const { imdbID } = req.params;
  try {
    // Rechercher le titre en base de données
    let title = await prisma.title.findUnique({
      where: { imdbID },
    });

    if (title && !title.dataCompleted) {
      // Si le titre existe mais les données ne sont pas complètes, interroger l'API OMDB
      const omdbResponse = await getOmdbDataByID(imdbID);
      const normalizedData = normalizeOmdbData(omdbResponse);

      // Mettre à jour le titre en base de données avec les données complètes
      title = await prisma.title.update({
        where: { imdbID },
        data: {
          ...normalizedData,
          dataCompleted: true,
        },
      });
    } else if (!title) {
      // Si le titre n'existe pas en base, interroger l'API OMDB
      const omdbResponse = await getOmdbDataByID(imdbID);
      const normalizedData = normalizeOmdbData(omdbResponse);

      if (omdbResponse.Response === "False") {
        return res.status(404).json({ message: "Title not found" });
      }

      //Enregistrer le nouveau titre en base de données
      title = await prisma.title.create({
        data: {
          ...normalizedData,
        },
      });
    }

    res.status(200).json(title);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTitlesByName,
  getTitleByImdbID,
};
