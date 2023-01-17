import { renderWithContexts } from "../test-utils/render";
import { screen } from "@testing-library/react";
import { AccountSettingsForm } from "../components/settings/AccountSettingsForm";
import userEvent from "@testing-library/user-event";

type UserOpts = {
  verified?: boolean;
  githubAccount?: boolean;
  gitlabAccount?: boolean;
};

function renderWithUser({ verified, githubAccount, gitlabAccount }: UserOpts) {
  const isOAuth = githubAccount || gitlabAccount;
  const emailVerifiedAt = verified || isOAuth ? "some ISO string..." : null;
  renderWithContexts(<AccountSettingsForm />, {
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

describe("Change Display Name input shows a validation error", () => {
  test("when name is less than 4 characters", async () => {
    const user = userEvent.setup();
    renderWithUser({ verified: false });

    const nameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.clear(nameInput);
    const warningText = await screen.findByText(/must be between 4-20 characters/i);

    expect(warningText).toBeInTheDocument();
  });

  test("when name is more than 20 characters", async () => {
    const user = userEvent.setup();
    renderWithUser({ verified: false });

    const nameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });

    await user.clear(nameInput);
    await user.click(nameInput);
    await user.keyboard("QQQQQQQQQQQQQQQQQQQQQ"); // 21 chars
    const warningText = await screen.findByText(/must be between 4-20 characters/i);

    expect(warningText).toBeInTheDocument();
  });
});

describe("Email input field", () => {
  describe("for non-OAuth account", () => {
    test("is disabled when user state claims email is not verified", () => {
      renderWithUser({ verified: false });

      const emailInput = screen.getByRole("textbox", {
        name: "Email",
      });

      expect(emailInput).toBeDisabled();
    });

    test("is enabled when user state claims email is verified", () => {
      renderWithUser({ verified: true });

      const emailInput = screen.getByRole("textbox", {
        name: "Email",
      });

      expect(emailInput).toBeEnabled();
    });
  });

  describe("for OAuth account", () => {
    test('is disabled and shows "GitHub Account" when user is registered with GitHub', () => {
      renderWithUser({ githubAccount: true });

      const emailInput = screen.getByRole("textbox", {
        name: "Email",
      });

      expect(emailInput).toHaveValue("GitHub Account");
      expect(emailInput).toBeDisabled();
    });

    test('is disabled and shows "GitLab Account" when user is registered with GitLab', () => {
      renderWithUser({ gitlabAccount: true });

      const emailInput = screen.getByRole("textbox", {
        name: "Email",
      });

      expect(emailInput).toHaveValue("GitLab Account");
      expect(emailInput).toBeDisabled();
    });
  });

  describe("badge", () => {
    test('shows "unverified" when user state claims email is not verified', () => {
      renderWithUser({ verified: false });

      const unverifiedBadge = screen.getByText("Unverified");

      expect(unverifiedBadge).toBeInTheDocument();
    });

    test('shows "verified" when user state claims email is verified', () => {
      renderWithUser({ verified: true });

      const verifiedBadge = screen.getByText("Verified");

      expect(verifiedBadge).toBeInTheDocument();
    });
  });
});

describe("Save Changes button", () => {
  test("is disabled initially", () => {
    renderWithUser({ verified: false });

    const saveChangesBtn = screen.getByRole("button", {
      name: /save changes/i,
    });

    expect(saveChangesBtn).toBeDisabled();
  });

  test("is enabled after form input is changed and valid", async () => {
    const user = userEvent.setup();
    renderWithUser({ verified: false });

    const nameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.click(nameInput);
    await user.keyboard("z");
    const saveChangesBtn = screen.getByRole("button", {
      name: /save changes/i,
    });

    expect(saveChangesBtn).toBeEnabled();
  });

  test("is disabled when form input is invalid", async () => {
    const user = userEvent.setup();
    renderWithUser({ verified: false });

    const nameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.clear(nameInput);
    await screen.findByText(/must be between 4-20 characters/i);
    const saveChangesBtn = screen.getByRole("button", {
      name: /save changes/i,
    });

    expect(saveChangesBtn).toBeDisabled();
  });
});

describe("Resend Verification Email button", () => {
  test("is disabled when user state claims email is verified", () => {
    renderWithUser({ verified: true });

    const resendEmailBtn = screen.getByRole("button", {
      name: /resend verification email/i,
    });

    expect(resendEmailBtn).toBeDisabled();
  });

  test("is enabled when user state claims email is unverified", () => {
    renderWithUser({ verified: false });

    const resendEmailBtn = screen.getByRole("button", {
      name: /resend verification email/i,
    });

    expect(resendEmailBtn).toBeEnabled();
  });
});
