CREATE TABLE "characters" (
	"id" text PRIMARY KEY NOT NULL,
	"level_id" text NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"x_pct" double precision NOT NULL,
	"y_pct" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "found_characters" (
	"id" text PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"character_id" text NOT NULL,
	"found_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "levels" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scores" (
	"id" text PRIMARY KEY NOT NULL,
	"level_id" text NOT NULL,
	"username" text NOT NULL,
	"score_ms" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"level_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp with time zone,
	"time_ms" integer
);
--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_level_id_levels_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."levels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "found_characters" ADD CONSTRAINT "found_characters_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "found_characters" ADD CONSTRAINT "found_characters_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scores" ADD CONSTRAINT "scores_level_id_levels_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."levels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_level_id_levels_id_fk" FOREIGN KEY ("level_id") REFERENCES "public"."levels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "characters_level_id_idx" ON "characters" USING btree ("level_id");--> statement-breakpoint
CREATE UNIQUE INDEX "found_characters_session_id_character_id_unique" ON "found_characters" USING btree ("session_id","character_id");--> statement-breakpoint
CREATE INDEX "scores_level_id_score_ms_idx" ON "scores" USING btree ("level_id","score_ms");--> statement-breakpoint
CREATE INDEX "scores_created_at_idx" ON "scores" USING btree ("created_at");