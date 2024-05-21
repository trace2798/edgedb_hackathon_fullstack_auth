CREATE MIGRATION m1stuvjfwnwoet63xtmotosjlqibsij4tgicrae37vnon5lr2c2tga
    ONTO m12a3blm3i4iwuqvca3lb6iy6mfowfwxak3bxik62scpxkd5x2teyq
{
  CREATE TYPE default::Activity {
      CREATE REQUIRED LINK workspace: default::Workspace {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY workspaceId := (.workspace.id);
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE PROPERTY message: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK activities := (.<workspace[IS default::Activity]);
  };
};
