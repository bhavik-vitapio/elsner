'use strict';

class RepairlyDetails {
  constructor($sce){

  	let $ctrl = this;
    this.$sce = $sce

  	class Panel {  		
  		constructor(panel,index){
  			angular.extend(this,panel);
  			this.index = index;
  		}
  		click(){
  			$ctrl.index = this.index
  		}
  		style(){
  			return this.show() ? 'outline' : 'filled';
  		}
  		show(){
  			return ($ctrl.index === this.index)
  		}
  	}
  	this.Panel = Panel

  }
  $onInit(){
  	this.index = 0;
  	this.panels = [
  		{
  			title: `Whats it all for?`,
  			content: `
					<p>We love turning negative experiences into positive ones. If you can find wonder and delight in a Phone repair, you can find it anywhere.
					<p>We estimate that 32,000 <a href="https://www.repairly.co.uk/iphone-repair/screen">Smartphone screens are smashed</a> every day in the UK alone. We’re working hard to make Repairly the obvious choice for having your Device repaired, and subsequently, we hope to turn thousands of small negative experiences into bright positive ones.
					<p>We want people across the UK, and then the world, to find wonder and delight in what may seem like the most trivial aspects of their lives, in the hope it blossoms into whatever they do next. From <a href="https://www.repairly.co.uk/ipad-repair">iPad</a> and <a href="https://www.repairly.co.uk/iphone-repair">iPhone repairs</a> to <a href="https://www.repairly.co.uk/lg-repair">LG</a>, <a href="https://www.repairly.co.uk/google-nexus-repair">Google Nexus</a> and <a href="https://www.repairly.co.uk/google-pixel-repair">Google Pixel repairs</a>, we have you covered.
  			`
  		},
  		{
  			title: `Status Quo`,
  			content: `
	        <p>
	        The awful moment happens; your Device smashes into a million pieces. Right now, you have three options…
	        </p>
	        <ol type="1">
	            <li>
	            Head to a manufacturer (like Apple for iPhones and iPads). You normally have to wait days to book an appointment, then spend a small/medium portion of your life waiting in a queue.  
	            </li>
	            <li>
	            Take your Device to a standard local repair shop. These guys are great, but you’ll have to go out of your way to find the right one, normally you’ll have to wait around for the repair to be completed, and it’s hard to know the quality of parts you will receive. 
	            </li>
	            <li>
	            If you're insured, you can post your Device to your insurer. In our experience, you can be without your dearest Device for up to 2 weeks, and the very worst we've heard of is 3 months 🙀.
	            </li>
	        </ol>
	        <p>
	        The current options have two key problems. Firstly, they're dead inconvenient. You have to take time out of your day and be without your Device for crazy long periods of time. Secondly, you’re left on your own to figure out where to turn, because no one -truly- wants to help.
	        </p>
	        <p>
	        At a time when technology is becoming more important to us than ever before, not having somewhere to turn to when your Device needs help seems like mild insanity to us. Think about it - when was the last time that you tried to navigate London without CityMapper, or organised to meet your friends without WhatsApp?
	        </p>
	        <p>
	        We’re all incredibly reliant on our Devices because they really are a digital extension of our lives. So, know deep in your bones, that we’re here to help when things go wrong.
	        </p>
				`
  		},
  		{
  			title: `Our Way`,
  			content: `
	        <p>
	        We're building Repairly so you have a service that you can trust when you need help with your technology, aka, your life.
	        </p>
	        <p>
	        We make it ridiculously simple to have your Device repaired, whether it is an iPhone, iPad or Samsung. Really, it’s ridiculous. It’s almost too easy. I’m writing this and I almost want to apologise for how easy it is. Sorry. Sorry from me. Sorry from us as a team. Repairly is THE quickest and most delightful way to get your Device sorted, and we’re afraid to say it’s only getting better.
	        </p>
	        <p>
	        We currently offer services for <a href="https://www.repairly.co.uk/iphone-repair">iPhone repair</a>, Samsung repair and <a href="https://www.repairly.co.uk/ipad-repair">iPad repair</a> but you'll see us adding new types of repairs, Devices and locations soon. You can order your repair online, then a Repairly Representative will micro-scooter to your location. They will pick your Device up (with white gloves?!) and return it, fixed, within two hours.
	        </p>
  			`
  		},
  		{
  			title: `Areas we serve`,
  			content: `
          <p>
          We currently service most of London zone 1 and 2. To check if we serve your postcode, head to the postcode entry box at the top of this page and enter in your postcode. We cover North, West, South and <a href="https://www.repairly.co.uk/iphone-repair/iphone-repair-east-london">East London</a>. Here are some of our most popular areas:
          </p>
          <ul>
              <li><a href="https://www.repairly.co.uk/iphone-repair/camden">Camden</a></li>
              <li><a href="https://www.repairly.co.uk/iphone-repair/moorgate">Moorgate</a></li>
              <li><a href="https://www.repairly.co.uk/iphone-repair/mayfair">Mayfair</a></li>
              <li><a href="https://www.repairly.co.uk/iphone-repair/aldgate">Aldgate</a></li>
              <li><a href="/iphone-repair/liverpool-street-london">Liverpool Street</a></li>
              <li><a href="/iphone-repair/canary-wharf-london">Canary Wharf</a></li>
              <li><a href="/iphone-repair/old-street-london">Old Street</a></li>
              <li><a href="/iphone-repair/shoreditch-london">Shoreditch</a></li>
              <li><a href="/iphone-repair/canary-wharf-london">Canary Wharf</a></li>
              <li><a href="/iphone-repair/waterloo-london">Waterloo</a></li>
              <li><a href="/iphone-repair/holborn-london">Holborn</a></li>
              <li><a href="/iphone-repair/oxford-street-circus-london">Oxford Street and Oxford Circus</a></li>
              <li><a href="/iphone-repair/tottenham-court-road-london">Tottenham Court Road</a></li>
              <li><a href="/iphone-repair/london-bridge-se1">London Bridge</a></li>
              <li><a href="/iphone-repair/clapham-london">Clapham</a></li>
              <li><a href="/iphone-repair/city-of-london-central">Central London</a></li>
              <li><a href="https://www.iphonerepairleeds.com/">Leeds</a></li>
          </ul>
  			`
  		}
  	].map((panel,index) => new this.Panel(panel,index))
  }
}

RepairlyDetails.$inject = ['$sce'];

export const repairlyDetails = {
  controller: RepairlyDetails,
  templateUrl: require('ngtemplate!./repairly-details.html')
}
  