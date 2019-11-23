import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/views/generalStyle';
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import { Player, BigPlayButton } from 'video-react';
import { API_ROOT_URL } from '../../config/endpoints-conf';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ChipsArray from "../../components/Chip/Chip";
import MyAvatar from "../../components/Avatar/Avatar";
import Comment from "../../components/Comment/Comment";
import ReactPlayer from 'react-player'
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ReactMarkdown from 'react-markdown';


class BlogPostDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('render Blog post detail');
    const { classes } = this.props;
    return (
        <GridContainer spacing={3} direction="row">
            {
                this.props.post && (
                    <React.Fragment>
                    <GridItem xs={12} sm={12} md={9} lg={9}>
                      <Paper>
                        <GridContainer spacing={3} direction="row">
                            <GridItem xs={12} sm={12} md={12} lg={12}>
                              <Card className={classes.cardDetail}>
                                <CardMedia
                                  className={classes.media}
                                  image={API_ROOT_URL + "/" + this.props.post.imageUrl}
                                  title={this.props.post.title}
                                />
                              </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12} lg={12}>
                                <Typography variant="h6" component="h2">
                                    {this.props.post.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {this.props.post.category.name}
                                </Typography>
                                <ChipsArray tags={this.props.post.tags}/>
                                <Divider style={{'margin': '5px auto'}}/>
                                <GridContainer spacing={1} direction="row">
                                    <GridItem xs={12} sm={1} md={1} lg={1}>
                                        <MyAvatar author={this.props.post.user.fullName}/>
                                    </GridItem>
                                    <GridItem xs={12} sm={11} md={11} lg={11}>
                                        <Grid container spacing={3}>
                                        <Grid item xs={12} sm={10} md={10} lg={10}>
                                            <Typography variant="subtitle1" gutterBottom>
                                            {this.props.post.user.fullName}
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom style={{'marginTop': '0px'}}>
                                            @{this.props.post.user.username}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={2} md={2} lg={2}>
                                            <Button variant="contained" color="secondary" className={classes.btnFollow}>
                                            Subscribe
                                            </Button>
                                        </Grid>
                                        </Grid>
                                    </GridItem>
                                </GridContainer>
                                <Divider style={{'margin': '5px auto'}}/>
                                <GridContainer spacing={1} direction="row">
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                      <ReactMarkdown source={this.props.post.description} />
                                    </Grid>
                                </GridContainer>
                                <Divider style={{'margin': '5px auto'}}/>
                                <Typography variant="subtitle1" gutterBottom>
                                Comments
                                </Typography>
                                <Comment 
                                  appUser={this.props.appUser}
                                  post={this.props.post}
                                  author={this.props.appUser.fullName}/>
                            </GridItem>
                        </GridContainer>
                      </Paper>  
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} lg={3}>
                        {
                            this.props.post && this.props.post.relatedPosts.length > 0 ? (
                                <React.Fragment>
                                    <Typography variant="h6" gutterBottom>
                                        Related Blogs
                                    </Typography>
                                    {
                                        this.props.post.relatedPosts.map((p, index) => 
                                        <React.Fragment key={'container' + index}>
                                          <Paper>
                                            <GridContainer spacing={2} >
                                                <GridItem item xs={4} sm={4} md={12} lg={12}>
                                                  <Link key={'linkpost' + index} href={'/post/blog/' + p.id}>
                                                    <CardMedia
                                                      className={classes.media}
                                                      image={API_ROOT_URL + "/" + p.imageUrl}
                                                      title={p.title}
                                                    />
                                                  </Link>
                                                </GridItem>
                                                <GridItem item xs={8} sm={8} md={12} lg={12}>
                                                    <Typography variant="subtitle2" component="h6">
                                                        {p.title}
                                                    </Typography>
                                                    <Typography variant="caption" gutterBottom>
                                                        {p.category.name}
                                                    </Typography>
                                                    <Typography variant="caption" display="block" gutterBottom style={{'marginTop': '0px'}}>
                                                    @{p.user.username}
                                                    </Typography>
                                                </GridItem>
                                            </GridContainer>
                                            <Divider style={{'margin': '5px auto'}}/>
                                            </Paper>
                                        </React.Fragment>    
                                        )
                                    }
                                    
                                </React.Fragment>
                            ) : (
                                <p>No related posts</p>
                            )
                        }
                    </GridItem>
                    </React.Fragment>
                )
            }
        </GridContainer>
    )
  }
}



export default withStyles(styles)(BlogPostDetail);
