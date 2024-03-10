const axios = require("axios");

class MarvelController {
  static async getCharacter(req, res, next) {
    try {
      const options = {
        method: "GET",
        url: "https://marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com/characters",
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
        },
      };
      const response = await axios.request(options);
      res.json(response.data);
    } catch (err) {
      next(err);
    }
  }

  static async getCharacterById(req, res, next) {
    try {
      const { id } = req.params;
      const options = {
        method: "GET",
        url:
          "https://marvel-heroic-api-unlock-the-mcu-legendary-characters.p.rapidapi.com/characters/" +
          id,
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
        },
      };

      try {
        const response = await axios.request(options);
        res.json(response.data);
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MarvelController;
