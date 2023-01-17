import { screen } from "@testing-library/react";
import { ChangePasswordForm } from "../components/settings/ChangePasswordForm";
import { renderWithContexts } from "../test-utils/render";

type UserOpts = {
  verified?: boolean;
  githubAccount?: boolean;
  gitlabAccount?: boolean;
};

function renderWithUser({ verified, githubAccount, gitlabAccount }: UserOpts) {
  const isOAuth = githubAccount || gitlabAccount;
  const emailVerifiedAt = verified || isOAuth ? "some ISO string..." : null;
  renderWithContexts(<ChangePasswordForm />, {
    user: {
      id: 1,
      avatar: "avatar.com",
      email: "test@test.com",
      email_verified_at: emailVerifiedAt,
      is_admin: false,
      name: "test account",
      github_id: githubAccount ? 1111 : null,
      gitlab_id: gitlabAccount ? 2222 : null,
    },
  });
}

describe("Change Password input fields", () => {
  test('is disabled and shows "GitHub Account" when user is registered with GitHub', () => {
    renderWithUser({ githubAccount: true });

    const oldPasswordField = screen.getByRole("textbox", {
      name: "Old Password",
    });
    const newPasswordField = screen.getByRole("textbox", {
      name: "New Password",
    });
    const confirmNewPasswordField = screen.getByRole("textbox", {
      name: "Confirm New Password",
    });

    expect(oldPasswordField).toHaveValue("GitHub Account");
    expect(oldPasswordField).toBeDisabled();
    expect(newPasswordField).toHaveValue("GitHub Account");
    expect(newPasswordField).toBeDisabled();
    expect(confirmNewPasswordField).toHaveValue("GitHub Account");
    expect(confirmNewPasswordField).toBeDisabled();
  });

  test('is disabled and shows "GitLab Account" when user is registered with GitLab', () => {
    renderWithUser({ gitlabAccount: true });

    const oldPasswordField = screen.getByRole("textbox", {
      name: "Old Password",
    });
    const newPasswordField = screen.getByRole("textbox", {
      name: "New Password",
    });
    const confirmNewPasswordField = screen.getByRole("textbox", {
      name: "Confirm New Password",
    });

    expect(oldPasswordField).toHaveValue("GitLab Account");
    expect(oldPasswordField).toBeDisabled();
    expect(newPasswordField).toHaveValue("GitLab Account");
    expect(newPasswordField).toBeDisabled();
    expect(confirmNewPasswordField).toHaveValue("GitLab Account");
    expect(confirmNewPasswordField).toBeDisabled();
  });
});

describe("Change Password button", () => {
  test("is disabled when user is registered with GitHub", () => {
    renderWithUser({ githubAccount: true });

    const changePasswordBtn = screen.getByRole("button", {
      name: "Change Password",
    });

    expect(changePasswordBtn).toBeDisabled();
  });

  test("is disabled when user is registered with GitLab", () => {
    renderWithUser({ gitlabAccount: true });

    const changePasswordBtn = screen.getByRole("button", {
      name: "Change Password",
    });

    expect(changePasswordBtn).toBeDisabled();
  });
});
