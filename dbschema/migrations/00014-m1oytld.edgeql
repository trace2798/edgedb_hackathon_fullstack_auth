CREATE MIGRATION m1oytld3u7grronn6pomjqnvbnlodzitshtddukmwp56qx4qvyws7q
    ONTO m1veitxgao3w7frpftczmccstxs2znvfsevypekyqadgukucmjktsa
{
  CREATE TYPE default::WebsiteAddress {
      CREATE REQUIRED LINK task: default::Task {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.task);
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY url: std::str;
  };
  ALTER TYPE default::Task {
      CREATE MULTI LINK websiteaddresses := (.<task[IS default::WebsiteAddress]);
  };
};
