import gql from 'graphql-tag';

export const LauncheMissionInfo = gql`
  query LauncheMissionInfo($id: String!) {
    launch(id: $id) {
      mission_name
      flight_number
      launch_year
      launch_success
      details
      launch_site {
        site_name
      }
      rocket {
        rocket_name
        rocket_type
      }
      links {
        flickr_images
      }
    }
  }
`