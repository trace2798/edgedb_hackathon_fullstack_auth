CREATE MIGRATION m1ldmccnzce53ys3apk43li5ie4wh4kur7rijueu7jx7gm7a2lcoma
    ONTO m1jinynisl6vqvjbjfl6gw4ifwny6qk7xblg3gbp3ytglpfk7kruha
{
  CREATE TYPE default::List {
      CREATE REQUIRED LINK board: default::Board {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.board);
      CREATE REQUIRED PROPERTY boardId := (.board.id);
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE REQUIRED PROPERTY order: std::int64;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
          CREATE REWRITE
              UPDATE 
              USING (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::Board {
      CREATE MULTI LINK lists := (.<board[IS default::List]);
  };
};
