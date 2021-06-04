<script>
  import NavbarApp from "./Navbar.svelte"
  import InputCanvas from "./InputCanvas.svelte";
  import VisualisationCanvas from "./VisualisationCanvas.svelte"
  import HelloWorldDummy from "./HelloWorldDummy.svelte";

  import {MDBContainer, MDBRow, MDBCol} from "mdbsvelte";
  import DeviceDetector from "svelte-device-detector";

  export let model;
  let scrollable = false;
  let showControls = true;

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
  const hideElement = () => showControls = false;
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

<body>

<DeviceDetector showInDevice="desktop">

  <MDBContainer fluid class="w-100 p-3" style="border:1px solid #999;">
    <MDBRow class="my-3">
      <MDBCol>  
        <NavbarApp />
      </MDBCol>
    </MDBRow>
    <MDBRow fluid class="row w-90 mx-auto my-5" style="border:1px solid #000;" id="contentBox">
      <MDBCol size="6" fluid class="col flex-fill text-center" style="border:1px solid #cecece;">
        <br>
        <InputCanvas />
        <HelloWorldDummy {model} />
      </MDBCol>
      <MDBCol size="6" fluid class="col flex-fill text-center" style="border:1px solid #cecece;">
        <VisualisationCanvas style="z-index: 2; position: absolute; top: 0px; left: 0px;"/>
        {#if showControls}
        <div class="view" style="z-index: 1; position: absolute; top: 25px; left: 50px;" on:click={ hideElement }>
          <img class="img-fluid" src="images/transparentImage.png" alt="Controls">
          <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
            <div class="d-flex justify-content-center align-items-center h-100">
              <p class="text-white mb-0">Click and drag to interact with visualisation</p>
            </div>
          </div>
        </div>
        {/if}
      </MDBCol>
    </MDBRow>
  </MDBContainer>

</DeviceDetector>

<DeviceDetector showInDevice="mobile">

  <MDBContainer fluid class="w-100 p-3" style="border:1px solid #999;">
    <MDBRow class="my-3">
      <MDBCol>  
        <NavbarApp />
      </MDBCol>
    </MDBRow>
    <MDBRow fluid class="row w-90 mx-auto my-5 d-flex" style="border:1px solid #000;"  id="contentBox">
      <MDBCol size="5" fluid class="col flex-fill" style="border:1px solid #cecece;">
        <VisualisationCanvas style="z-index: 2; position: absolute; top: 0px; left: 0px;"/>
        {#if showControls}
        <div class="view" style="z-index: 1; position: absolute; top: 25px; left: 50px;" on:click={ hideElement }>
          <img class="img-fluid" src="images/transparentImage.png" alt="Controls">
          <div class="mask" style="background-color: rgba(0, 0, 0, 0.6);">
            <div class="d-flex justify-content-center align-items-center h-100">
              <p class="text-white mb-0">Click and drag to interact with visualisation</p>
            </div>
          </div>
        </div>
        {/if}
        <HelloWorldDummy {model} />
      </MDBCol>
      <MDBCol size="5" fluid class="col flex-fill" style="border:1px solid #cecece;">
        <InputCanvas />
      </MDBCol>
    </MDBRow>
  </MDBContainer>

</DeviceDetector>
</body>

<style>
  body {
    margin:0;
    background-color: rgb(54, 57, 63);
    color: #bfc2c7;
    overflow: hidden;
  }
</style>
