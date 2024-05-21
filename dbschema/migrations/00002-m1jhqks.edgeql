CREATE MIGRATION m1jhqksm6yv53w5ykli2awqr3tofe6a4e7qy6ohe25f6pngtnwpjia
    ONTO m1lgv7kqznx7emxohrla2zapon7zhpezug7pgotdhpl4f3mf77yzoq
{
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          DROP CONSTRAINT std::exclusive;
      };
  };
};
