<script>
  import NavbarApp from "./Navbar.svelte"
  import InputCanvas from "./InputCanvas.svelte";
  import HelloWorldDummy from "./HelloWorldDummy.svelte";

  import {MDBContainer, MDBRow, MDBCol} from "mdbsvelte";
  import DeviceDetector from "svelte-device-detector";
  export let model;
  let scrollable = false;
  const wheel = (node, options) => {
		let { scrollable } = options;
		
		const handler = e => {
			if (!scrollable) e.preventDefault();
		};
		
		node.addEventListener('wheel', handler, { passive: false });
		
		return {
			update(options) {
				scrollable = options.scrollable;
			},
			destroy() {
				node.removeEventListener('wheel', handler, { passive: false });
			}
		};
  };
</script>

<svelte:window use:wheel={{scrollable}} />

<svelte:head>
<!-- Font Awesome -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
<!-- Google Fonts -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
<!-- Bootstrap core CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
<!-- Material Design Bootstrap -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.16.0/css/mdb.min.css" rel="stylesheet">
</svelte:head>

<MDBContainer class="w-100" style="border:1px solid #999;">
  <MDBRow class="my-3">
    <MDBCol>  
      <!--<NavbarApp />-->
    </MDBCol>
  </MDBRow>
  <MDBRow class="row w-90 mx-auto my-5" style="border:1px solid #000;">
    <MDBCol class="col" style="border:1px solid #cecece;">
      <InputCanvas />
    </MDBCol>
    <MDBCol class="col" style="border:1px solid #cecece;">
      <HelloWorldDummy {model} />
    </MDBCol>
  </MDBRow>
</MDBContainer>
  import VisualisationCanvas from "./VisualisationCanvas.svelte"
</script>

<main>
  <HelloWorldDummy />
  <InputCanvas />
  <VisualisationCanvas />
</main>

<style>
</style>
