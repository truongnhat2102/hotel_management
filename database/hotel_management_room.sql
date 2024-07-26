-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: localhost    Database: hotel_management
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` bigint NOT NULL AUTO_INCREMENT,
  `room_amount_people` varchar(255) DEFAULT NULL,
  `room_description` varchar(255) DEFAULT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `room_price` varchar(255) DEFAULT NULL,
  `room_status` varchar(255) DEFAULT NULL,
  `room_type` varchar(255) DEFAULT NULL,
  `room_img1` varchar(255) DEFAULT NULL,
  `room_img2` varchar(255) DEFAULT NULL,
  `room_img3` varchar(255) DEFAULT NULL,
  `room_img4` varchar(255) DEFAULT NULL,
  `room_img5` varchar(255) DEFAULT NULL,
  `room_img6` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'10','Cái đẹp thì mỗi người sẽ nhìn một cách khác nhau, có người thích phong cách châu âu, có người thích phong cách tân cổ điển, có người lại thích thiết kế khách sạn theo phong cách năng động, hiện đại','B307','123456','Not Empty','VIP','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg',NULL),(2,'5','những nhân viên dọn vệ sinh khách sạn luôn thường trực và dọn sạch căn phòng cũng như những khu vực khác của khách sạn','A401','123456','Not Empty','Normal','https://ik.imagekit.io/tvlk/blog/2023/09/khach-san-view-bien-da-nang-1.jpg?tr=dpr-2,w-675','https://ik.imagekit.io/tvlk/blog/2023/09/khach-san-view-bien-da-nang-1.jpg?tr=dpr-2,w-675','https://ik.imagekit.io/tvlk/blog/2023/09/khach-san-view-bien-da-nang-1.jpg?tr=dpr-2,w-675','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg',NULL),(3,'10','vị trí gần trung tâm, view thoáng đẹp, thuận tiện cho việc thăm quan du lịch hay những dịch vụ xung quanh như chợ, trung tâm thương mại, khu vui chơi giải trí','B302','123456','Not Empty','VIP','https://danang-shopping.com/wp-content/uploads/2018/05/khach-san-duong-bach-da-nang-pariat-novotel-1-800x533.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg',NULL),(4,'10','Ngoài việc đảm bảo được tiêu chuẩn đánh giá sao khách sạn với các vật dụng cần thiết bạn cũng nên trang bị cho khách sạn của mình những trang thiết bị khách sạn phù hợp.','B789','200000','Not Empty','VIP','https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/06/rosamia-da-nang-hotel-phong-khach-san.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg','https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg',NULL),(5,'4','Lấy cảm hứng từ bờ biển Đà Nẵng sôi động, bờ biển rộng lớn mang đến tầm nhìn tuyệt vời cho một kỳ nghỉ dài và chỉ cách cuộc sống thành phố Đà Nẵng nhộn nhịp vài bước chân.','A212','100000','Not Empty','VIP','https://www.samdihotel.vn/uploads/image/images/_I5A5276%20copy(1).jpg',NULL,NULL,NULL,NULL,NULL),(6,'3','aejironbagioenr','C434','200000','Empty','Normal','https://vietnamdailytour.vn/wp-content/uploads/2022/09/Khach-san-Da-Nang-3-sao.jpeg',NULL,NULL,NULL,NULL,NULL),(7,'3','asda','C434','200000','Empty','Normal','https://danang-shopping.com/wp-content/uploads/2017/01/969181631.jpg',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-20  3:20:17
