CREATE MIGRATION m1hltffzfursxxhbxgtupvlcggp4xruynz2e6npohaezr6xevofbpq
    ONTO m1g7lakgu3dbz3uzpddxgy5oxo5eltly5rp2pvb2jmgzrgq2ajuvfa
{
  CREATE TYPE default::Workspace {
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED PROPERTY userId := (.user.id);
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK workspaces := (.<user[IS default::Workspace]);
  };
};
