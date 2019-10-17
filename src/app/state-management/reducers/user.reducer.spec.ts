import { userReducer } from "./user.reducer";
import { initialUserState } from "../state/user.store";
import * as fromActions from "../actions/user.actions";
import { User, MessageType, Message, Settings, UserIdentity } from "../models";
import { AccessToken } from "shared/sdk";

describe("UserReducer", () => {
  describe("on loginAction", () => {
    it("should set isLoggingIn to true and isLoggedIn to false", () => {
      const form = {
        username: "test",
        password: "test",
        rememberMe: true
      };
      const action = fromActions.loginAction({ form });
      const state = userReducer(initialUserState, action);

      expect(state.isLoggingIn).toEqual(true);
      expect(state.isLoggedIn).toEqual(false);
    });
  });

  describe("on loginCompletAction", () => {
    it("should set currentUser, accountType, and set isLoggingIn to false and isLoggedIn to true", () => {
      const user = new User();
      const accountType = "test";
      const action = fromActions.loginCompleteAction({ user, accountType });
      const state = userReducer(initialUserState, action);

      expect(state.currentUser).toEqual(user);
      expect(state.accountType).toEqual(accountType);
      expect(state.isLoggingIn).toEqual(false);
      expect(state.isLoggedIn).toEqual(true);
    });
  });

  describe("on loginFailedAction", () => {
    it("should set both isLoggingIn and isLoggedIn to false", () => {
      const action = fromActions.loginFailedAction();
      const state = userReducer(initialUserState, action);

      expect(state.isLoggingIn).toEqual(false);
      expect(state.isLoggedIn).toEqual(false);
    });
  });

  describe("on fetchCurrentUserCompleteAction", () => {
    it("should set currentUser", () => {
      const user = new User();
      const action = fromActions.fetchCurrentUserCompleteAction({ user });
      const state = userReducer(initialUserState, action);

      expect(state.currentUser).toEqual(user);
    });
  });

  describe("on fetchUserIdentityCompleteAction", () => {
    it("should set profile", () => {
      const userIdentity = new UserIdentity();
      const action = fromActions.fetchUserIdentityCompleteAction({
        userIdentity
      });
      const state = userReducer(initialUserState, action);

      expect(state.profile).toEqual(userIdentity.profile);
    });
  });

  describe("on fetchCatamelTokenCompleteAction", () => {
    it("should set catamelToken", () => {
      const token = new AccessToken();
      const action = fromActions.fetchCatamelTokenCompleteAction({ token });
      const state = userReducer(initialUserState, action);

      expect(state.catamelToken).toEqual(token);
    });
  });

  describe("on logoutCompleteAction", () => {
    it("should reset the state to initial state", () => {
      const action = fromActions.logoutCompleteAction();
      const state = userReducer(initialUserState, action);

      expect(state).toEqual(initialUserState);
    });
  });

  describe("on selectColumnAction", () => {
    it("should add a column to displayedColumns", () => {
      const column = "test";
      const action = fromActions.selectColumnAction({ column });
      const state = userReducer(initialUserState, action);

      expect(state.displayedColumns).toContain(column);
    });
  });

  describe("on deselectColumnAction", () => {
    it("should add a column to displayedColumns", () => {
      const column = "test";
      initialUserState.displayedColumns.push(column);

      const action = fromActions.deselectColumnAction({ column });
      const state = userReducer(initialUserState, action);

      expect(state.displayedColumns).not.toContain(column);
    });
  });

  describe("on showMessageAction", () => {
    it("should set message", () => {
      const message: Message = {
        content: "",
        type: MessageType.Success,
        duration: 500000
      };
      const action = fromActions.showMessageAction({ message });
      const state = userReducer(initialUserState, action);

      expect(state.message).toEqual(message);
    });
  });

  describe("on clearMessageAction", () => {
    it("should clear message", () => {
      const action = fromActions.clearMessageAction();
      const state = userReducer(initialUserState, action);

      expect(state.message).toEqual(initialUserState.message);
    });
  });

  describe("on saveSettingsAction", () => {
    it("should set settings", () => {
      const settings: Settings = {
        tapeCopies: "",
        datasetCount: 0,
        jobCount: 0,
        darkTheme: false
      };
      const action = fromActions.saveSettingsAction({ settings });
      const state = userReducer(initialUserState, action);
      expect(state.settings).toEqual(settings);
    });
  });
});
