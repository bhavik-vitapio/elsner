
class Helper {
  static respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
      if (entity) {
        res.status(statusCode).json(entity);
      }
    };
  }
  static handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
      if(err.statusCode) statusCode = err.statusCode;
      delete err.statusCode;
      err.status = statusCode;
      if(err.name==='VersionError') err.status = 409;
      res.status(err.status).send(err);
    };
  }
  static removeEntity(res) {
    return function(entity) {
      if (entity) {
        return entity.remove()
          .then(() => {
            res.status(204).end();
          });
      }
    };
  }
  static saveUpdates(updates) {
    return function(entity) {
      var updated = _.merge(entity, updates);
      return updated.save()
        .then(updated => {
          return updated;
        });
    };
  }
  static handleEntityNotFound(res) {
    return function(entity) {
      if (!entity) {
        res.status(404).end();
        return null;
      }
      return entity;
    };
  }
}

module.exports = Helper;