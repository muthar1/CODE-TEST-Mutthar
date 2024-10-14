function sendResponse(res, code, message, data, error) {
  if (error) console.error(error);

  return res.status(code).send({ code, message, data });
}

function sortArray(arrData, sortKey, sortOrder) {
  return arrData.sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (sortOrder.toLowerCase() === "asc") {
      return valueA > valueB ? 1 : -1; // Ascending
    } else if (sortOrder.toLowerCase() === "desc") {
      return valueA < valueB ? 1 : -1; // Descending
    }
    return 0; // No sorting if order is not recognized
  });
}

function paginateData(data, pageNum, pageSize) {
  const total = data.length;
  const limit = parseInt(pageSize, 10);
  const offset = (parseInt(pageNum, 10) - 1) * limit;
  const paginatedData = data.slice(offset, offset + limit);

  return {
    total,
    hasNextPage: offset + limit < total,
    hasPreviousPage: offset > 0,
    page: parseInt(pageNum, 10),
    totalPages: Math.ceil(total / limit),
    data: paginatedData,
  };
}

module.exports = { sendResponse, sortArray, paginateData };
