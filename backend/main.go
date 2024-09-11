package main


import (

   "net/http"


   "github.com/gin-gonic/gin"


   "github.com/Parichatx/user-system2/config"

   "github.com/Parichatx/user-system2/middlewares"

	"github.com/Parichatx/user-system2/controller/user"

)


const PORT = "8000"

func main() {


	// open connection database
 
	config.ConnectionDB()
 
 
	// Generate databases
 
	config.SetupDatabase()
 
 
	r := gin.Default()
 
 
	r.Use(CORSMiddleware())
 
 
	// Auth Route
 
	r.POST("/signup", user.SignUp)
 
	r.POST("/signin", user.SignIn)
 
 
	router := r.Group("/")
 
	{
 
		router.Use(middlewares.Authorizes())
 
 
		// User Route
 
		router.PUT("/user/:id", user.Update)
 
		router.GET("/users", user.GetAll)
 
		router.GET("/user/:id", user.Get)
 
		router.DELETE("/user/:id", user.Delete)
 
 
	}
 
 
 
 
	r.GET("/", func(c *gin.Context) {
 
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
 
	})
 
 
	// Run the server
 
 
	r.Run("localhost:" + PORT)
 
 
 }
 
 
 func CORSMiddleware() gin.HandlerFunc {
 
	return func(c *gin.Context) {
 
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
 
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
 
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
 
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
 
 
		if c.Request.Method == "OPTIONS" {
 
			c.AbortWithStatus(204)
 
			return
 
		}
 
 
		c.Next()
 
	}
 
 }