const express = require("express");
const logger = require("morgan");
const http = require("http");
const PinsRouter = require("./routes/pins");
const Pins = require("./models/Pins");
const request = require("request");
const axios = require('axios');
const requestPromise = require('request-promise-native');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use("/api", PinsRouter.router);
app.set("port", 3000);

describe("Testing Router", () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET", () => {
    // GET 200
    it("200 and find pin", done => {
      const data = [{ id: 1 }];
      spyOn(Pins, "find").and.callFake(callBack => {
        callBack(false, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{ id: 1 }]);
        done();
      });
    });

    // GET 500
    it("500", done => {
      const data = [{ id: 1 }];
      spyOn(Pins, "find").and.callFake(callBack => {
        callBack(true, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });

    // find by id
    it("findById", done => {
      const idPin = "1";
      spyOn(Pins, "findById").and.callFake((id, callBack) => {
        callBack(false, id);
      });

      request.get(
        `http://localhost:3000/api/${idPin}`,
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          expect(Pins.findById.calls.argsFor(0)[0]).toEqual(idPin);
          expect(JSON.parse(response.body)).toEqual(idPin);
          done();
        }
      );
    });

    // GET findById error
    it("findById and get error", done => {
      spyOn(Pins, "findById").and.callFake((id, callBack) => {
        callBack(true, id);
      });

      request.get("http://localhost:3000/api/1", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe("POST",  () => {
    it("200", async () => {
      spyOn(Pins, "create").and.callFake((id, callBack) => {
        callBack(false, id);
      });

      spyOn(requestPromise, 'get').and.returnValue(Promise.resolve('<title>Diego</title><meta="description" content="Diego best">'));

      const _pins = {
        title: 'Diego',
        author: 'Diego',
        description: 'Diegos test',
        percentage: 0,
        tags: [],
        assets: []
      };

      const response = await axios.post("http://localhost:3000/api", _pins);
      expect(response.status).toBe(200);
    });

    it("should return 500 error database", async () => {
      spyOn(Pins, "create").and.callFake((id, callBack) => {
        callBack(true, id);
      });

      spyOn(requestPromise, 'get').and.returnValue(Promise.resolve('<title>Diego</title><meta name="description" content="Diego best">'));

      const _pins = {
        title: 'Diego',
        author: 'Diego',
        description: 'Diegos test',
        percentage: 0,
        tags: [],
        assets: [{
          url: 'http://diego.com'
        }]
      };
      try {
        await axios.post("http://localhost:3000/api", _pins);
      } catch (error) {
        expect(error.response.status).toBe(500);
      }
    });

    it("should return 500 asset url error", async () => {
      spyOn(Pins, "create").and.callFake((id, callBack) => {
        callBack(false, id);
      });

      spyOn(requestPromise, 'get').and.callFake(() => Promise.reject(new Error('url not found')))

      const _pins = {
        title: 'Diego',
        author: 'Diego',
        description: 'Diegos test',
        percentage: 0,
        tags: [],
        assets: [{
          url: 'http://diego.com'
        }]
      };
      try {
        await axios.post("http://localhost:3000/api", _pins);
      } catch (error) {
        expect(error.response.status).toBe(500);
        expect(Pins.create).not.toHaveBeenCalled();
        expect(requestPromise.get).toHaveBeenCalledTimes(1);
      }
    });

    it("should return 200 with a PDF url", async () => {
      spyOn(Pins, "create").and.callFake((id, callBack) => {
        callBack(false, id);
      });

      const _pins = {
        title: 'Diego',
        author: 'Diego',
        description: 'Diegos test',
        percentage: 0,
        tags: [],
        assets: [{
          url: 'http://diego.com.pdf'
        }]
      };
      try {
        const response = await axios.post("http://localhost:3000/api", _pins);
        expect(response.status).toBe(200);
      } catch (error) {

      }
    });
  });


  describe('PUT routes', () => {
    it('should be 200 with pins correct', async () => {
      spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, pin, callback) => {
        callback(false, pin)
      })

      const _pins = {
        title: 'Diego',
        author: 'Diego',
        description: 'Diegos test',
        percentage: 0,
        tags: [],
        assets: [{
          url: 'http://diego.com.pdf'
        }]
      };

      const response = await axios.put("http://localhost:3000/api/1", _pins);
      expect(response.status).toBe(200);
      expect(Pins.findByIdAndUpdate).toHaveBeenCalledTimes(1); //valida que sea llamado una vez
      expect(Pins.findByIdAndUpdate).toHaveBeenCalledWith('1', _pins, jasmine.any(Function)) //valida que el metodo sea llamado con esos argumentos
      expect(Pins.findByIdAndUpdate.calls.argsFor(0)).toEqual(['1', _pins, jasmine.any(Function)]) //obtiene los argumentos de la primer llamada
      expect(response.data).toEqual(jasmine.objectContaining({title: 'Diego'}));
      // calls.allArgs trae un array con todas las llamadas
      //calls.mostRecent() trae la mas reciente llamada
    })

    it('should be 500 error database', async () => {
      spyOn(Pins, 'findByIdAndUpdate').and.callFake((id, pin, callback) => {
        callback(true, pin)
      })

      const _pins = {
        title: 'Diego',
        author: 'Diego',
        description: 'Diegos test',
        percentage: 0,
        tags: [],
        assets: [{
          url: 'http://diego.com.pdf'
        }]
      };
      try {
        const response = await axios.put("http://localhost:3000/api/1", _pins);
      } catch (error) {
        expect(error.response.status).toBe(500);
        expect(Pins.findByIdAndUpdate).toHaveBeenCalledTimes(1); //valida que sea llamado una vez
        expect(Pins.findByIdAndUpdate).toHaveBeenCalledWith('1', _pins, jasmine.any(Function)) //valida que el metodo sea llamado con esos argumentos
        expect(Pins.findByIdAndUpdate.calls.argsFor(0)).toEqual(['1', _pins, jasmine.any(Function)]) //obtiene los argumentos de la primer llamada
        expect(error.response.data).toContain('<title>Error</title>');
      }
    })
  })

  describe('DELETE routes', () => {
    it('should be 200 with pins correct', async () => {
      const pinDeleted ={
        title: 'Diego',
        author: 'Diego',
        description: 'Diegos test',
        percentage: 0,
        tags: [],
        assets: [{
          url: 'http://diego.com.pdf'
        }]
      };
      spyOn(Pins, 'findByIdAndRemove').and.callFake((id, pin, callback) => {
        callback(false, pinDeleted)
      })

      const options = {
      };

      const response = await axios.delete("http://localhost:3000/api/1", options);
      expect(response.status).toBe(200);
      expect(Pins.findByIdAndRemove).toHaveBeenCalledTimes(1); //valida que sea llamado una vez
      expect(Pins.findByIdAndRemove).toHaveBeenCalledWith('1', options, jasmine.any(Function)) //valida que el metodo sea llamado con esos argumentos
      expect(Pins.findByIdAndRemove.calls.argsFor(0)).toEqual(['1', options, jasmine.any(Function)]) //obtiene los argumentos de la primer llamada
      expect(response.data).toEqual(jasmine.objectContaining({title: 'Diego'}));
      // calls.allArgs trae un array con todas las llamadas
      //calls.mostRecent() trae la mas reciente llamada
    })

    it('should be 500 error database', async () => {
      spyOn(Pins, 'findByIdAndRemove').and.callFake((id, pin, callback) => {
        callback(true)
      })

      const options = {
      };
      try {
        const response = await axios.delete("http://localhost:3000/api/1", options);
      } catch (error) {
        expect(error.response.status).toBe(500);
        expect(Pins.findByIdAndRemove).toHaveBeenCalledTimes(1); //valida que sea llamado una vez
        expect(Pins.findByIdAndRemove).toHaveBeenCalledWith('1', options, jasmine.any(Function)) //valida que el metodo sea llamado con esos argumentos
        expect(Pins.findByIdAndRemove.calls.argsFor(0)).toEqual(['1', options, jasmine.any(Function)]) //obtiene los argumentos de la primer llamada
        expect(error.response.data).toContain('<title>Error</title>');
      }
    })
  })
});
