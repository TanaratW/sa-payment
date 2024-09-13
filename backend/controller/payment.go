package controller

import (
	"net/http"
	"time"

	"github.com/TanaratW/sa-payment/config"
	"github.com/TanaratW/sa-payment/entity"
	"github.com/gin-gonic/gin"
)

// GET / ดึงข้อมูล payment ทั้งหมด
func ListAllPayments(c *gin.Context) {
	var payments []entity.Payments
	if err := config.DB().Find(&payments).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch payments"})
			return
	}

	c.JSON(http.StatusOK, payments)
}

// POST / สร้างการชำระเงิน
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