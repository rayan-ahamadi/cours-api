const { prisma } = require("#prismaORM/prisma.js");

const getTitlesByName = async (req, res) => {
    const { name } = req.params;

    try {
        // Rechercher les titres en base de données
        let titleResults = await prisma.title.findMany({
            where: {
                title: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
        });

        // Si aucun titre n'est trouvé en base, interroger l'API OMDB
        if (titleResults.length === 0) {
            const omdbReponse = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(name)}&apikey=${process.env.OMDB_API_KEY}`);
            const omdbData = await omdbReponse.json();

            if (omdbData.Response === 'False') {
                return res.status(404).json({ message: 'No titles found' });
            }

            // Enregistrer les résultats dans la base de données 
            omdbData.Search.forEach(async (item) => {
                await prisma.title.create({
                    data: {
                        title: item.Title,
                        year: item.Year,
                        imdbId: item.imdbID,
                        type: item.Type,
                        poster: item.Poster,
                    },
                });
            });

            // Utiliser les résultats de l'API OMDB pour la réponse
            titleResults = omdbData.Search;
        }

        res.status(200).json({
            "titleResults": titleResults,
            "totalResults": titleResults.length
        }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTitleByImdbID = async (req, res) => {
    const { imdbID } = req.params;
    try {
        let title = await prisma.title.findUnique({
            where: { imdbID },
        });

        const omdbReponse = await fetch(`http://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${process.env.OMDB_API_KEY}`);
        const omdbData = await omdbReponse.json();

        if (omdbData.Response === 'False') {
            return res.status(404).json({ message: 'Title not found' });
        }

        if (!title) {
            // Si le titre n'existe pas en base, le récupérer depuis l'API OMDB
            const newTitle = await prisma.title.create({
                data: {
                    ...omdbData,
                },
            });

            title = newTitle;
        } else {
            // Mettre à jour les informations du titre existant avec les données de l'API OMDB
            const updatedTitle = await prisma.title.update({
                where: { imdbID },
                data: {
                    ...omdbData,
                },
            });
            title = updatedTitle;
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