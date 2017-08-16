SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `scores` (
  `username` varchar(50) NOT NULL,
  `seconds` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `scores` (`username`, `seconds`, `id`) VALUES
('Andy', 5, 1),
('Karl', 10, 2),
('Example', 219, 4);

ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`);
  
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
