CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`size` int NOT NULL,
	`mime_type` varchar(255) NOT NULL,
	`folder_id` int,
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `folders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`parent_id` int,
	CONSTRAINT `folders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_folder_id_folders_id_fk` FOREIGN KEY (`folder_id`) REFERENCES `folders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `folders` ADD CONSTRAINT `folders_parent_id_folders_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `folders`(`id`) ON DELETE no action ON UPDATE no action;