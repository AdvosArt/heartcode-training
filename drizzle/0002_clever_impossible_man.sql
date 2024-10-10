CREATE TABLE IF NOT EXISTS "heartcodeTraining_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(32) NOT NULL,
	"isDrugDealer" boolean NOT NULL
);
