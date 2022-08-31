import { Card, CardContent, ListItemIcon, Typography, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { DONT_RULES, DO_RULES } from '../utils/constants'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const CardHeadingStyles = { 
    fontSize: 22, 
    textAlign: 'center', 
    fontWeight: 'bold' 
}


const CardSubHeadingStyle = {
    fontSize: 18,
    fontWeight: 'bold'
}

const DoDontComponent = () => {
  return (
    <Card style={{ marginTop: 10, borderRadius: 5 }}>
      <CardContent>
        <Typography
          sx={{ ...CardHeadingStyles }}
          color="text.secondary"
          gutterBottom
          testId="ruleHeading"
        >
          Do's and Dont's
        </Typography>
        <Typography sx={{ ...CardSubHeadingStyle }} color="green" gutterBottom>
          DO's
        </Typography>
        <List>
          {DO_RULES.map((doRule) => (
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary={doRule} />
            </ListItem>
          ))}
        </List>
        <br />
        <Typography sx={{ ...CardSubHeadingStyle }} color="red" gutterBottom>
          Dont's
        </Typography>
        <List>
          {DONT_RULES.map((dontRule) => (
            <ListItem>
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
              <ListItemText primary={dontRule} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default React.memo(DoDontComponent)