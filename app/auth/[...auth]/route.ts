import { auth } from "@/edgedb";
import { Octokit } from "@octokit/core";
import { redirect } from "next/navigation";

export const { GET, POST } = auth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, tokenData, isSignUp, provider }) {
    if (error) {
      console.error("sign in failed", error);
    }

    if (!tokenData) {
      // console.log("email verification required");
    }

    if (true) {
      if (provider === "builtin::oauth_github") {
        const octokit = new Octokit({ auth: tokenData?.provider_token });
        // console.log(octokit);
        const result = await octokit.request("GET /user", {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        // console.log(result);
        const client = auth.getSession().client;
        // console.log(client);
        const resultEdge = await client.query(
          `
        INSERT User {
          name := <optional str>$name,
          email := <optional str>$email,
          avatarUrl := <optional str>$avatarUrl,
          githubUsername := <optional str>$githubUsername,
          userRole := 'user',
          identity := (global ext::auth::ClientTokenIdentity)
        } unless conflict on .githubUsername
        else (UPDATE User SET {
          name := <optional str>$name,
          email := <optional str>$email,
          avatarUrl := <optional str>$avatarUrl,
        })
      `,
          {
            name: result?.data?.name || result?.data?.login,
            email: result?.data?.email,
            avatarUrl: result?.data?.avatar_url,
            githubUsername: result?.data?.login,
          }
        );
      }
    }
    redirect("/workspace");
  },
  onSignout() {
    redirect("/");
  },
});
