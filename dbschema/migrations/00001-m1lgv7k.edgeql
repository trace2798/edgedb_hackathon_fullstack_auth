CREATE MIGRATION m1lgv7kqznx7emxohrla2zapon7zhpezug7pgotdhpl4f3mf77yzoq
    ONTO initial
{
  CREATE EXTENSION pgvector VERSION '0.5';
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE EXTENSION ai VERSION '1.0';
  CREATE SCALAR TYPE default::Role EXTENDING enum<admin, user>;
  CREATE TYPE default::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity;
      CREATE REQUIRED PROPERTY avatarUrl: std::str;
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY githubUsername: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY userRole: default::Role {
          SET default := 'user';
      };
  };
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
