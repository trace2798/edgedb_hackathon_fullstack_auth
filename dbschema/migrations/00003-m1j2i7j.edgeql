CREATE MIGRATION m1j2i7j2izfbnaixsuuiwxs2hu4f6phxiyoxmtyabexqoygovqjroq
    ONTO m1jhqksm6yv53w5ykli2awqr3tofe6a4e7qy6ohe25f6pngtnwpjia
{
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          RESET OPTIONALITY;
      };
  };
};
