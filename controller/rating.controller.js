const { prisma } = require("#prismaORM/prisma.js");

const getRatingsFromUser = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [ratings, total] = await Promise.all([
      prisma.rating.findMany({
        skip: skip,
        take: limit,
        include: {
          title: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.rating.count({
        where: { userId: userId },
      }),
      prisma.rating.count(),
    ]);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      results: ratings,
      user: user,
      totalResults: total,
      page: page,
      totalPages: totalPages,
      limit: limit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastsRatings = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [ratings, total] = await Promise.all([
      prisma.rating.findMany({
        skip: skip,
        take: limit,
        include: {
          title: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.rating.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      results: ratings,
      totalResults: total,
      page: page,
      totalPages: totalPages,
      limit: limit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rateTitle = async (req, res) => {
  const userId = parseInt(req.user.id); // Récupère depuis le middleware authMiddleware
  const { titleId, score, comment } = req.body;

  try {
    const newRating = await prisma.rating.create({
      data: {
        userId: userId,
        titleId: titleId,
        rating: score,
        comment: comment,
      },
    });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRating = async (req, res) => {
  const userId = parseInt(req.params.user.id);
  const ratingId = parseInt(req.params.ratingId);
  const updateData = req.body;

  try {
    const existingRating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });
    if (!existingRating || existingRating.userId !== userId) {
      return res
        .status(404)
        .json({ message: "Rating not found or unauthorized" });
    }

    const updatedRating = await prisma.rating.update({
      where: { id: ratingId },
      data: updateData,
    });
    res.status(200).json(updatedRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRating = async (req, res) => {
  const userId = parseInt(req.params.user.id);
  const ratingId = parseInt(req.params.ratingId);

  try {
    const existingRating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });
    if (!existingRating || existingRating.userId !== userId) {
      return res
        .status(404)
        .json({ message: "Rating not found or unauthorized" });
    }

    await prisma.rating.delete({
      where: { id: ratingId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getRatingsFromUser,
  getLastsRatings,
  rateTitle,
  updateRating,
  deleteRating,
};
