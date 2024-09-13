package controller

import (
	"net/http"
	"time"

	"github.com/TanaratW/sa-payment/config"
	"github.com/TanaratW/sa-payment/entity"
	"github.com/gin-gonic/gin"
)

// GET /payments
func ListAllPayments(c *gin.Context) {
	var payments []entity.Payments
	if err := config.DB().Find(&payments).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch payments"})
			return
	}

	c.JSON(http.StatusOK, payments)
}

// GET /courses
func ListCourse(c *gin.Context) {
	var courses []entity.Courses
	if err := config.DB().Find(&courses).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch courses"})
			return
	}

	c.JSON(http.StatusOK, courses)
}


// GET /course-price/:id
func GetCoursePrice(c *gin.Context) {
	ID := c.Param("id")
	var price float64

	db := config.DB()
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}

	results := db.Model(&entity.Courses{}).Select("price").Where("id = ?", ID).Scan(&price)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"course_id": ID,
		"price": price,
	})
}

// GET /course-title/:id
func GetCourseName(c *gin.Context) {
	ID := c.Param("id")
	var title string

	db := config.DB()
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to connect to the database"})
		return
	}

	results := db.Model(&entity.Courses{}).Select("title").Where("id = ?", ID).Scan(&title)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"course_id": ID,
		"title": title,
	})
}


// POST /payment
func CreatePayment(c *gin.Context) {
	var payment entity.Payments
	if err := c.ShouldBindJSON(&payment); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
	}

	payment.EnrollmentDate = time.Now()

	db := config.DB()

	// บันทึกข้อมูลการชำระเงินลงฐานข้อมูล
	if err := db.Create(&payment).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create payment"})
			return
	}

	c.JSON(http.StatusOK, payment)
}