import { renderWithContexts } from "../test-utils/render";
import { screen } from "@testing-library/react";
import { AccountSettingsForm } from "../components/settings/AccountSettingsForm";
import userEvent from "@testing-library/user-event";

describe("Change Display Name input shows a validation error", () => {
  test("when name is less than 4 characters", async () => {
    const user = userEvent.setup();
    renderWithContexts(<AccountSettingsForm />, {
      user: {
        id: 1,
        avatar: "avatar.com",
        email: "test@test.com",
        email_verified_at: "",
        is_admin: false,
        name: "test account",
        github_id: null,
        gitlab_id: null,
      },
    });

    const nameInput = screen.getByRole("textbox", {
      name: /display name/i,
    });
    await user.clear(nameInput);
    const warningText = await screen.findByText(/must be between 4-20 characters/i);

    expect(warningText).toBeInTheDocument();
  });

  test("when name is more than 20 characters", async () => {
    const user = userEvent.setup();
    renderWithContexts(<AccountSettingsForm />, {
      user: {
        id: 1,
        avatar: "avatar.com",
        email: "test@test.com",
        email_verified_at: "",
        is_admin: false,
        name: "test account",
        github_id: null,
        gitlab_id: null,
      },
    });

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

describe("Email input field badge", () => {
  test('shows "unverified" when user state claims email is not verified', () => {
    renderWithContexts(<AccountSettingsForm />, {
      user: {
        id: 1,
        avatar: "avatar.com",
        email: "test@test.com",
        email_verified_at: null,
        is_admin: false,
        name: "test account",
        github_id: null,
        gitlab_id: null,
      },
    });

    const unverifiedBadge = screen.getByText("Unverified");

    expect(unverifiedBadge).toBeInTheDocument();
  });

  test('shows "verified" when user state claims email is verified', () => {
    renderWithContexts(<AccountSettingsForm />, {
      user: {
        id: 1,
        avatar: "avatar.com",
        email: "test@test.com",
        email_verified_at: "some ISO timestamp...",
        is_admin: false,
        name: "test account",
        github_id: null,
        gitlab_id: null,
      },
    });

    const verifiedBadge = screen.getByText("Verified");

    expect(verifiedBadge).toBeInTheDocument();
  });
});
