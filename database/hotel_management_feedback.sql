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
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` bigint NOT NULL AUTO_INCREMENT,
  `feedback_comment` varchar(255) DEFAULT NULL,
  `feedback_vote` int NOT NULL,
  `room_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `room` bigint DEFAULT NULL,
  `feedback_date_edit` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `FK3f6svlc0gdd8jhh1g8c9lwm8b` (`room_id`),
  KEY `FK7k33yw505d347mw3avr93akao` (`user_id`),
  KEY `FKqdbbbj0jye16nigdbh1soygwu` (`room`),
  CONSTRAINT `FK3f6svlc0gdd8jhh1g8c9lwm8b` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  CONSTRAINT `FK7k33yw505d347mw3avr93akao` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKqdbbbj0jye16nigdbh1soygwu` FOREIGN KEY (`room`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'Hello',5,1,1,1,'2024-07-13 00:00:00.000000'),(2,'Bye',4,2,5,2,'2024-07-13 00:00:00.000000'),(3,'Love',3,3,7,3,'2024-07-13 00:00:00.000000'),(6,'hello',4,NULL,9,1,'2024-07-19 10:49:16.996895'),(7,'hello',4,NULL,11,1,'2024-07-19 10:51:07.223068'),(8,'hello',4,NULL,1,1,'2024-07-19 10:53:13.398417'),(9,'hello',4,NULL,5,1,'2024-07-19 10:54:45.350959'),(10,'hello',4,NULL,7,1,'2024-07-19 10:57:45.986616'),(11,'hello',4,NULL,9,1,'2024-07-19 10:59:04.847532'),(12,'hello',4,NULL,11,1,'2024-07-19 11:30:58.717759'),(13,'hello',4,NULL,1,1,'2024-07-19 23:00:39.860388'),(14,'hello',4,NULL,5,1,'2024-07-19 23:02:17.621430'),(15,'hello',4,NULL,7,1,'2024-07-19 23:04:48.131927'),(16,'abcd',4,NULL,9,1,'2024-07-19 23:06:10.732417'),(17,'abcdf',4,NULL,7,1,'2024-07-19 23:07:48.480531'),(18,'abcd1234',3,NULL,7,1,'2024-07-19 23:12:21.188740');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
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
