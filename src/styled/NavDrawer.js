import React from 'react'
import styled from 'styled-components'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'

// template literal ticks ``, allows you to inject JS with styles
const StayVisible = styled.div`
  position: absolute;
  margin-left: ${(props) => (props.open) ? `${props.width}px` : 'none'};
  transition: margin .2s;
`

export const NavToggleButton = (props) => {
  return (
    <StayVisible
      {...props} // called ellipses then props which is an easy way to access all props
      // open={props.open}   Don't need this because we used ellipses
      // width={props.width} Don't need this because we used ellipses
    >
      <FloatingActionButton
        onTouchTap={props.toggle}
      >
        <Menu />
      </FloatingActionButton>
    </StayVisible>
  )
}