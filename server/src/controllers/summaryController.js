const summaryService = require('../services/summaryService');

const getSummary = async (req, res, next) => {
  try {
    const stats = await summaryService.getSummaryStats(req.userId);
    res.status(200).json(stats);
  } catch (error) { next(error); }
};

const getProgress = async (req, res, next) => {
  try {
    const exerciseName = req.query.exercise || null;
    const data = await summaryService.getProgressData(req.userId, exerciseName);
    res.status(200).json(data);
  } catch (error) { next(error); }
};

const getActivity = async (req, res, next) => {
  try {
    const period = req.query.period || 'week';
    const count = parseInt(req.query.count, 10) || 8;
    const data = await summaryService.getActivityData(req.userId, period, count);
    res.status(200).json(data);
  } catch (error) { next(error); }
};

module.exports = { getSummary, getProgress, getActivity };
