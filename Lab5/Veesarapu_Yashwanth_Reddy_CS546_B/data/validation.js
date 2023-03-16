module.exports = {
  checkId(id) {
    if (!id) throw { status: 400, msg: "Invalid URL Parameter" };
    if (typeof id !== "string")
      throw { status: 400, msg: "Invalid URL Parameter" };
    id = id.trim();
    if (id.length === 0)
      throw {
        status: 400,
        msg: "Invalid URL Parameter",
      };

    if (!id.match(/^[0-9]+$/))
      throw { status: 400, msg: "Invalid URL Parameter" };

    id = parseInt(id);
    if (id < 0) throw { status: 400, msg: `Invalid URL Parameter` };

    return id;
  },
};
