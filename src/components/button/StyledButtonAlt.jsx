import { Button } from '@mui/material'

const StyledButtonAlt = ({ handleEvent, children }) => {
  return (
    <Button
      variant="outlined"
      onClick={handleEvent}
      sx={{
        // backgroundColor: 'var(--red-color)',
        color: 'var(--black-color)',
        borderColor: 'var(--black-color)',
        '&:hover': {
          borderColor: 'var(--red-color)',
          color: 'var(--red-color)',
          boxShadow: 'none'
        }
      }}
    >
      {children}
    </Button>
  )
}

export default StyledButtonAlt
