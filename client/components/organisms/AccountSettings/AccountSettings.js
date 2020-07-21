import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
const R = require('ramda');

import SlideOutMenu from '_organisms/SlideOutMenu';
import ChangePassword from '_organisms/ChangePassword';
import AlertCircle from '_assets/icons/alert-circle.svg';
import Lock from '_assets/icons/lock.svg';
import SettingsIcon from '_assets/icons/settings.svg';
import Trash from '_assets/icons/trash-2.svg';
import X from '_assets/icons/x.svg';
import { attemptDeleteUser } from '../../../store/actions/user';

const AccountSettings = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(R.pick(['user']));

  const [settingsPending, setSettingsPending] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  const handleUpdateAccountSettings = () => {
    if (settingsPending) {
      // Dispatch update account setting
      setSettingsPending(false);
    }
  };

  const toggleSettingsMenu = (bool) => {
    if (bool === false) handleUpdateAccountSettings();

    setIsSettingsMenuOpen((prevState) => !prevState);
  };

  const deleteAccount = () => {
    dispatch(attemptDeleteUser(user.id));
  };

  return (
    <>
      <SlideOutMenu
        isOpen={isSettingsMenuOpen}
        closeCallback={() => toggleSettingsMenu(false)}
        right
        width={350}
      >
        <StyledAccountSettings>
          <X
            className="close-button"
            onClick={() => {
              toggleSettingsMenu(false);
              handleUpdateAccountSettings();
            }}
          />
          <h1>Account Settings</h1>

          {/* Account Settings */}
          <h2>
            <Lock />
            Change Your Password
          </h2>

          <ChangePassword />

          {/* Delete Account */}
          <h2>
            <AlertCircle />
            Danger Zone
          </h2>

          <DeleteSection
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to delete your account? All of your data will be lost.',
                )
              )
                deleteAccount();
            }}
          >
            <Trash />
            Delete this account
          </DeleteSection>
        </StyledAccountSettings>
      </SlideOutMenu>

      <SettingsIcon onClick={() => toggleSettingsMenu(true)} />
    </>
  );
};

const StyledAccountSettings = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.onSurface};
  width: 100%;
  min-height: 100%;
  padding: 20px;

  .close-button {
    position: absolute;
    right: 0;
    top: 0;
    margin: 20px;
    font-size: 28px;
    color: ${({ theme }) => theme.colors.monotoneAccent};
    cursor: pointer;
    padding: 4px;
    background: ${({ theme }) => theme.colors.background};
  }

  h1,
  h2,
  h3 {
    font-weight: 400;
  }

  h1 {
    margin: 0;
  }

  h2 {
    margin-bottom: 0.8rem;
    margin-top: 2.3rem;
    display: flex;

    svg {
      margin-right: 0.5rem;
    }
  }

  h2 + p {
    margin-top: 0.3rem;
  }
`;

const DeleteSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.medium('onSurface')};
  margin-bottom: ${({ theme }) => theme.sizes.spacingLarge};

  svg {
    margin-right: 6px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.error};

    svg {
      color: ${(props) => props.theme.colors.error};
    }
  }
`;

AccountSettings.propTypes = {};

export default AccountSettings;
