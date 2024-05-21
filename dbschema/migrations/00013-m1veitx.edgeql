CREATE MIGRATION m1veitxgao3w7frpftczmccstxs2znvfsevypekyqadgukucmjktsa
    ONTO m1mbpbebw2eke2scgtltkkdldfbeoh4lu45guqkcn3wzjkke65xwja
{
  CREATE TYPE default::TaskActivity {
      CREATE REQUIRED LINK task: default::Task {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE REQUIRED PROPERTY message: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::Task {
      CREATE MULTI LINK taskactivities := (.<task[IS default::TaskActivity]);
  };
};
