using extension auth;
using extension ai;

module default {
  scalar type Role extending enum<admin, user>;

  global current_user := (
    assert_single((
      select User
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

 type User {
    required identity: ext::auth::Identity;
    required name: str;
    email: str;
    required githubUsername: str {
      constraint exclusive;
    };
    required avatarUrl: str;
  
    userRole: Role {
      default := "user";
    };

    created: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    updated: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    multi workspaces := .<user[is Workspace];
    index on (.githubUsername)
  }

  type Workspace {
    required name: str;
    description: str;
    required userId := .user.id;
    created: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    updated: cal::local_datetime {
      default := cal::to_local_datetime(datetime_current(), 'UTC');
    }
    required link user -> User
  }

}
