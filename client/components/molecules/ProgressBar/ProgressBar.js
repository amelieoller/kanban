import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MinusCircle from '_assets/icons/minus-circle.svg';
import PlusCircle from '_assets/icons/plus-circle.svg';

const ProgressBar = ({ total, elapsed, type, handleBarUpdate, increment, minus }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatedPercentage = (elapsed / total) * 100;

    setPercentage(calculatedPercentage > 100 ? 100 : calculatedPercentage);
  }, [total, elapsed]);

  const handleTotalUpdate = (amount) => {
    let newTotal = total + amount;

    // If newTotal are below 0, set to 0
    if (newTotal < 0) newTotal = 0;

    // If newTotal are the same as total return
    if (newTotal === total) return;

    handleBarUpdate(newTotal);
  };

  return (
    <Wrapper>
      <ProgressBarWrapper>
        {minus && (
          <Button data-type="isClickable" onClick={() => handleTotalUpdate(-increment)}>
            <MinusCircle data-type="isClickable" />
          </Button>
        )}

        <ProgressWrapper>
          <ProgressFiller className="filler" width={percentage}>
            <TextLeft>
              {total - elapsed} {type} left
            </TextLeft>
          </ProgressFiller>
        </ProgressWrapper>

        <Button data-type="isClickable" onClick={() => handleTotalUpdate(increment)}>
          <PlusCircle data-type="isClickable" />
        </Button>
      </ProgressBarWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 3px;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  align-items: center;
  display: flex;

  svg {
    height: 13px;
    width: 13px;
    color: ${({ theme }) => theme.colors.lighter(8, 'onSurface')};
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProgressWrapper = styled.div`
  position: relative;
  height: 12px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.lighter(9, 'onSurface')};
  width: 100%;
`;

const ProgressFiller = styled.div`
  background: ${({ theme }) => theme.colors.lighter(8, 'onSurface')};
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
  color: ${({ theme }) => theme.colors.onSecondary};
  display: flex;
  align-items: center;
  width: ${({ width }) => width}%;
`;

const TextLeft = styled.span`
  color: ${({ theme }) => theme.colors.lighter(5, 'onSurface')};
  font-size: 0.75rem;
  font-style: italic;
  white-space: nowrap;
  padding-left: 4px;
`;

ProgressBar.propTypes = {
  total: PropTypes.number.isRequired,
  elapsed: PropTypes.number,
  type: PropTypes.string.isRequired,
  handleBarUpdate: PropTypes.func.isRequired,
  increment: PropTypes.number.isRequired,
  minus: PropTypes.bool,
};

ProgressBar.defaultProps = {
  elapsed: 0,
};

export default ProgressBar;
