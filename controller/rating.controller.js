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

module.exports = {
  getRatingsFromUser,
  getLastsRatings,
};
