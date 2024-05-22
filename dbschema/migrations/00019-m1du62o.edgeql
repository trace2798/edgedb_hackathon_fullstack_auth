CREATE MIGRATION m1du62oxiey3kvvfjyx5p5gjckpwmtfpdejor7zfy6h5g7sqcsomlq
    ONTO m1ldmccnzce53ys3apk43li5ie4wh4kur7rijueu7jx7gm7a2lcoma
{
  CREATE TYPE default::Card {
      CREATE REQUIRED PROPERTY priority: std::str {
          SET default := 'no priority';
      };
      CREATE INDEX ON (.priority);
      CREATE REQUIRED LINK list: default::List {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.list);
      CREATE REQUIRED PROPERTY status: std::str {
          SET default := 'todo';
      };
      CREATE INDEX ON (.status);
      CREATE REQUIRED PROPERTY listId := (.list.id);
      CREATE PROPERTY assigneeId: std::uuid;
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY duedate: std::datetime;
      CREATE REQUIRED PROPERTY order: std::int64;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
          CREATE REWRITE
              UPDATE 
              USING (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::List {
      CREATE MULTI LINK cards := (.<list[IS default::Card]);
  };
};
