-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: lego
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `letter`
--

DROP TABLE IF EXISTS `letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `letter` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `letter` char(1) DEFAULT NULL,
  `urlImage` text,
  `cost` int(11) DEFAULT NULL,
  `representation` binary(28) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter`
--

LOCK TABLES `letter` WRITE;
/*!40000 ALTER TABLE `letter` DISABLE KEYS */;
INSERT INTO `letter` VALUES (1,'A','pictures/a.png',12,'0000010001010100011111110001'),(2,'B','pictures/b.png',16,'0001111010001111101000111110'),(3,'C','pictures/c.png',11,'0000111010001100001000101110'),(4,'D','pictures/d.png',14,'0001111010001100011000111110'),(5,'E','pictures/e.png',15,'0001111110000111001000011111'),(6,'F','pictures/f.png',11,'0001111110000111001000010000'),(7,'G','pictures/g.png',14,'0000111110000100111000101111'),(8,'H','pictures/h.png',13,'0001000110001111111000110001'),(9,'I','pictures/i.png',13,'0001111100100001000010011111'),(10,'J','pictures/j.png',8,'0000000100001000011000101110'),(11,'K','pictures/k.png',11,'0001000110010111001001010001'),(12,'L','pictures/l.png',9,'0001000010000100001000011111'),(13,'M','pictures/m.png',13,'0001000111011101011000110001'),(14,'N','pictures/n.png',13,'0001000111001101011001110001'),(15,'O','pictures/o.png',12,'0000111010001100011000101110'),(16,'P','pictures/p.png',12,'0001111010001111101000010000'),(17,'Q','pictures/q.png',14,'0000111010001100011001101111'),(18,'R','pictures/r.png',14,'0001111010001111101000110001'),(19,'S','pictures/s.png',13,'0000111110000011100000111110'),(20,'T','pictures/t.png',9,'0001111100100001000010000100'),(21,'U','pictures/u.png',11,'0001000110001100011000101110'),(22,'V','pictures/v.png',9,'0001000110001100010101000100'),(23,'W','pictures/w.png',12,'0001000110001101011010101010'),(24,'X','pictures/x.png',9,'0001000101010001000101010001'),(25,'Y','pictures/y.png',7,'0001000101010001000010000100'),(26,'Z','pictures/z.png',13,'0001111100010001000100011111'),(27,'1','pictures/1.png',11,'0001110000100001000010011111'),(28,'2','pictures/2.png',14,'0001111000001011101000011111'),(29,'3','pictures/3.png',12,'0001111000001001100000111110'),(30,'4','pictures/4.png',12,'0001001010010100101111100010'),(31,'5','pictures/5.png',15,'0001111110000111100000111110'),(32,'6','pictures/6.png',14,'0000111110000111101000101110'),(33,'7','pictures/7.png',9,'0001111100001000100010000100'),(34,'8','pictures/8.png',13,'0000111010001011101000101110'),(35,'9','pictures/9.png',14,'0000111010001011110000111110');
/*!40000 ALTER TABLE `letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resources` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES (1,'brick',56447),(2,'plate',362);
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `password` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'user','user','12dea96fec20593566ab75692c9949596833adc9'),(2,'admin','maintainer','d033e22ae348aeb5660fc2140aec35850c4da997');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-29 12:08:10
