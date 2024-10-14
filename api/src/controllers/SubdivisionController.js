const utils = require("../utils");
const fs = require("fs");

async function getSubDivisions(req, res) {
  try {
    const {
      filterByKey,
      filterByValue,
      sortKey,
      sortOrder,
      page = 1,
      limit = 10,
    } = req.query;

    const fileData = fs.readFileSync("data/subdivision.json");
    let subdivisions = JSON.parse(fileData).subdivisions;

    // Filtering
    if (filterByKey && filterByValue) {
      subdivisions = subdivisions.filter(
        (subdivion) => subdivion[filterByKey] === filterByValue
      );
    }

    // Sorting
    if (sortKey && sortOrder) {
      subdivisions = utils.sortArray(subdivisions, sortKey, sortOrder);
    }

    subdivisions = utils.paginateData(subdivisions, page, limit);
    res.set("Access-Control-Allow-Origin", "*");
    return utils.sendResponse(res, 200, "Success", subdivisions);
  } catch (err) {
    process.env.NODE_ENV && console.log(err);
    utils.sendResponse(res, 500, "Internal Server Error", undefined, err);
  }
}

module.exports = { getSubDivisions };
