CREATE MIGRATION m12a3blm3i4iwuqvca3lb6iy6mfowfwxak3bxik62scpxkd5x2teyq
    ONTO m1d5eez6ldiohvaf4wh3pn2i5exjoeovksge72zqyvapfj6vodhp7a
{
  ALTER TYPE default::WorkspaceMember {
      ALTER PROPERTY email {
          RENAME TO githubUsername;
      };
  };
  ALTER TYPE default::WorkspaceMember {
      DROP PROPERTY name;
  };
};
