'use strict';

module.exports = function (Reslove) {
  var status = false;
  Reslove.disableRemoteMethod("findById", status);


  Reslove.create2 = function (datares, cb) {
    Reslove.create({
      "parent": datares.parent,
      "name": datares.name,
      "text": datares.text,
      "id": datares.id,
      "create_date": datares.create_date,
      "edit_date": datares.edit_date,
      "user_rec": datares.user_rec,
      "solution": datares.solution,
      "cause": datares.cause,
      "path": datares.path
    }, function (err, resultll) {
      console.log(datares.id)
      cb(null, resultll)
    })
    console.log(datares.id);

  }
  Reslove.findres = function (mydata, cb) {
    console.log(mydata);
    Reslove.find( { where:{"parent":mydata.id }}, function (err, soll) {
      if (err) {
        cb(null, 'err')
      } else
        cb(null, soll)

    })
  }
  Reslove.updateres = function (upres, cb) {
    Reslove.upsert(
      {
        "parent": upres.parent,
        "name": upres.name,
        "text": upres.text,
        "id": upres.id,
        "create_date": upres.create_date,
        "edit_date": upres.edit_date,
        "user_rec": upres.user_rec,
        "solution": upres.solution,
        "cause": upres.cause,
        "path": upres.path
      }, function (err, sol3) {
        if (err) {
          cb(null, 'err')
        } else {
          cb(null, sol3)
        }
      }
    )
  }
  Reslove.delres = function (remove, cb) {
    Reslove.destroyById(remove.id, function (err, sol4) {
        console.log(remove.id)
        if (err) {
          cb(null, 'err')
        }
        else cb(null, sol4)
        console.log(sol4);
      }
    )
  }
  Reslove.seek = function (finda, cb) {
    Reslove.findById(finda.id, {fields: {id: true, parent: true, name: true,}}, function (err, fina) {
      if (err) {
        cb(null, 'err')
      }
      else {
        cb(null, fina)
      }
    })
  }

  Reslove.findparent = function (id, cb) {
    Reslove.find({where: {"parent": id.parent}}, function (err, sol) {
      if (err) {
        cb(null, 'err')
      } else
        cb(null, sol)
      console.log(id);
    })
  }
  Reslove.findnew = function (fn, cb) {
    console.log(fn);

    Reslove.find( { where:{"parent":1 }}, function (err, soll) {
      if (err) {
        cb(null, 'err')
      } else
        cb(null, soll)

    })
  }

  Reslove.remoteMethod(
    'create2',
    {

      accepts: [{arg: 'datares', type: 'object', http: {source: 'body'},}],
      returns: {arg: 'reslovearg', type: 'object', root: true},
      http: {path: '/created', verb: 'post'}
    }
  )
  Reslove.remoteMethod(
    'findres',
    {
      http: {path: '/parent/:id', verb: 'get'},
      accepts: {
        arg: 'mydata', type: 'object', http: function (mydata) {

          var req =mydata.req
          var obj= {
            id:req.params.id
          }
          return obj;

        }
      },
      returns: {arg: 'gg', type: 'object',root:true},


    }
  )
  Reslove.remoteMethod(
    'updateres',
    {
      accepts: [{arg: 'upres', type: 'object', http: {source: 'body'}}],
      returns: {arg: 'updeteres', type: 'object', root: true},
      http: {path: '/updated', verb: 'post'}

    }
  )
  Reslove.remoteMethod(
    'delres',
    {
      accepts: [{arg: 'remove', type: 'object', http: {source: 'body'}}],
      returns: {arg: 'delidna', type: 'object'},
      http: {path: '/delete', verb: 'delete'}

    }
  )
  Reslove.remoteMethod(
    'seek',
    {
      accepts: [{arg: 'finda', type: 'object', http: {source: 'body'}}],
      returns: {arg: 'updeted', type: 'object', root: true},
      http: {path: '/findidna:id', verb: 'post'}

    }
  )
  Reslove.remoteMethod(
    'findparent',
    {
      accepts: [{arg: 'data10', type: 'object', http: {source: 'body'}}],
      returns: {arg: 'xxx', type: 'object', root: true},
      http: {path: '/findparent', verb: 'post'}

    }
  )
  Reslove.remoteMethod(
    'findnew',
    {

      accepts: [{arg: 'fn', type: 'object'}],
      returns: {arg: 'finnewww', type: 'object', root: true},
      http: {path: '/newfind', verb: 'get'}
    }
  )
};
