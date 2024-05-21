CREATE MIGRATION m1lttrigpegili2au5oje7y4vse3ckkt44kjmrhnvhwxmevsy3xoaq
    ONTO m1hltffzfursxxhbxgtupvlcggp4xruynz2e6npohaezr6xevofbpq
{
  CREATE SCALAR TYPE default::MemberRole EXTENDING enum<admin, member, owner>;
  CREATE TYPE default::WorkspaceMember {
      CREATE REQUIRED LINK user: default::User;
      CREATE REQUIRED LINK workspace: default::Workspace;
      CREATE REQUIRED PROPERTY userId := (.user.id);
      CREATE REQUIRED PROPERTY workspaceId := (.workspace.id);
      CREATE PROPERTY created: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE PROPERTY memberRole: default::MemberRole {
          SET default := 'member';
      };
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY updated: cal::local_datetime {
          SET default := (cal::to_local_datetime(std::datetime_current(), 'UTC'));
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK workspaceMembers := (.<user[IS default::WorkspaceMember]);
  };
  ALTER TYPE default::Workspace {
      CREATE MULTI LINK workspaceMembers := (.<workspace[IS default::WorkspaceMember]);
  };
};
