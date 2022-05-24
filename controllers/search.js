const client = require("../middelwares/elasticsearch");

exports.hello = async (req, res) => {
    try {
        const info = await client.info()
        res.json(info)
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || e })
    }
}

const objectBinding = {
    "#": "promoteur",
    ">":"societe_immo"
}

exports.search = async (req, res) => {
    try {
        let state = req.params.query[0]

        let query = {
            "size": 1000,
            "query": {
              "match": 
              { 
                "Nom": {
                    "query": objectBinding[state]?req.params.query.slice(1):req.params.query,
                    "fuzziness": 1
                }
              }
            }
        }

        if(objectBinding[state]){
            query['index'] = objectBinding[state];
            if(req.params.query.length==1)
                delete query.query;
        }
        else{

        }
        
        const info = await client.search(query)

        let result = info.hits.hits.reduce(function (r, a) {
            r[a._index] = r[a._index] || [];
            r[a._index].push(a);
            return r;
        }, Object.create(null));

        res.json({info, result});
    } catch (e) {
        res.status(e.status || 500).json({ message: e.message || e })
    }
}