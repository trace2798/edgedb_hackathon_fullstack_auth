CREATE MIGRATION m1jinynisl6vqvjbjfl6gw4ifwny6qk7xblg3gbp3ytglpfk7kruha
    ONTO m1pxub2mr4aoq2hdth253qyyxgb5lq5kpn3eunfss4u6oid2nxkxiq
{
  CREATE TYPE default::Board {
      CREATE REQUIRED LINK workspace: default::Workspace {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE INDEX ON (.workspace);
      CREATE REQUIRED LINK workspaceMember: default::WorkspaceMember;
      CREATE PROPERTY backgroundImage: std::str;
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
          CREATE REWRITE
              UPDATE 
              USING (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK boards := (.<workspace[IS default::Board]);
  };
  ALTER TYPE default::WorkspaceMember {
      CREATE MULTI LINK boards := (.<workspaceMember[IS default::Board]);
  };
};
