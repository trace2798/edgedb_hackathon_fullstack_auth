CREATE MIGRATION m1d5eez6ldiohvaf4wh3pn2i5exjoeovksge72zqyvapfj6vodhp7a
    ONTO m1lttrigpegili2au5oje7y4vse3ckkt44kjmrhnvhwxmevsy3xoaq
{
  ALTER TYPE default::WorkspaceMember {
      ALTER PROPERTY email {
          RESET OPTIONALITY;
      };
  };
};
