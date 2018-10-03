var SERVER_NAME = 'products-api' //
var PORT = 8000;
var HOST = '127.0.0.1';


var restify = require('restify')

  // Get a persistence engine for the users
  , usersSave = require('save')('products')  //

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /products') //
  console.log(' /products/:id')//
  console.log(' /products/:price')  //
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all products in the system
server.get('/products', function (req, res, next) {   //

  // Find every entity within the given collection
  usersSave.find({}, function (error, products) {//

    // Return all of the users in the system
    res.send(products)//
  })
})

// Get a single user by their user id
server.get('/products/:id', function (req, res, next) { //

  // Find a single user by their id within save
  usersSave.findOne({ _id: req.params.id }, function (error, products) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (products) {  //
      // Send the user if no issues
      res.send(products)  //
    } else {
      // Send 404 header if the user doesn't exist
      res.send(404)
    }
  })
})

// Create a new product
server.post('/products', function (req, res, next) {//

  // Make sure product is defined
  if (req.params.product === undefined ) {//
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('product must be supplied'))
  }
  if (req.params.price === undefined ) {//
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be supplied'))
  }
  var newProduct = {  //
		product: req.params.product, //
		price: req.params.price //
	}

  // Create the product using the persistence engine
  productsSave.create( newProduct, function (error, product) {  //

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send the product if no issues
    res.send(201, product)  //
  })
})

// Update a user by their id
server.put('/produts/:id', function (req, res, next) { //

  // Make sure product is defined
  if (req.params.product === undefined ) {//
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('product must be supplied'))
  }
  if (req.params.price === undefined ) {//
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be supplied'))
  }
  
  var newProduct = { //
		_id: req.params.id,
		product: req.params.product, //
		price: req.params.price//
	}
  
  // Update the user with the persistence engine
  productsSave.update(newProduct, function (error, product) { //

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
  })
})

// Delete user with the given id
server.del('/products/:id', function (req, res, next) {  //

  // Delete the user with the persistence engine
  productsSave.delete(req.params.id, function (error, product) {  //

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()
  })
})


