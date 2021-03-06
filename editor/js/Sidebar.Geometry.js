Sidebar.Geometry = function ( editor ) {

	var signals = editor.signals;

	var geometryClasses = {

		"CircleGeometry": THREE.CircleGeometry,
		"CubeGeometry": THREE.CubeGeometry,
		"CylinderGeometry": THREE.CylinderGeometry,
		"ExtrudeGeometry": THREE.ExtrudeGeometry,
		"IcosahedronGeometry": THREE.IcosahedronGeometry,
		"LatheGeometry": THREE.LatheGeometry,
		"OctahedronGeometry": THREE.OctahedronGeometry,
		"ParametricGeometry": THREE.ParametricGeometry,
		"PlaneGeometry": THREE.PlaneGeometry,
		"PolyhedronGeometry": THREE.PolyhedronGeometry,
		"ShapeGeometry": THREE.ShapeGeometry,
		"SphereGeometry": THREE.SphereGeometry,
		"TetrahedronGeometry": THREE.TetrahedronGeometry,
		"TextGeometry": THREE.TextGeometry,
		"TorusGeometry": THREE.TorusGeometry,
		"TorusKnotGeometry": THREE.TorusKnotGeometry,
		"TubeGeometry": THREE.TubeGeometry,
		"Geometry": THREE.Geometry,
		"BufferGeometry": THREE.BufferGeometry

	};

	var container = new UI.Panel();
	container.setBorderTop( '1px solid #ccc' );
	container.setPadding( '10px' );
	container.setDisplay( 'none' );

	var objectType = new UI.Text().setColor( '#666' ).setTextTransform( 'uppercase' );
	container.add( objectType );
	container.add( new UI.Break(), new UI.Break() );

	// uuid

	var geometryUUIDRow = new UI.Panel();
	var geometryUUID = new UI.Input().setWidth( '115px' ).setColor( '#444' ).setFontSize( '12px' ).setDisabled( true );
	var geometryUUIDRenew = new UI.Button( '⟳' ).setMarginLeft( '7px' ).onClick( function () {

		geometryUUID.setValue( THREE.Math.generateUUID() );
		update();

	} );

	geometryUUIDRow.add( new UI.Text( 'UUID' ).setWidth( '90px' ).setColor( '#666' ) );
	geometryUUIDRow.add( geometryUUID );
	geometryUUIDRow.add( geometryUUIDRenew );

	container.add( geometryUUIDRow );

	// name

	var geometryNameRow = new UI.Panel();
	var geometryName = new UI.Input().setWidth( '150px' ).setColor( '#444' ).setFontSize( '12px' ).onChange( update );

	geometryNameRow.add( new UI.Text( 'Name' ).setWidth( '90px' ).setColor( '#666' ) );
	geometryNameRow.add( geometryName );

	container.add( geometryNameRow );

	// vertices

	var geometryVerticesRow = new UI.Panel();
	var geometryVertices = new UI.Text().setColor( '#444' ).setFontSize( '12px' );

	geometryVerticesRow.add( new UI.Text( 'Vertices' ).setWidth( '90px' ).setColor( '#666' ) );
	geometryVerticesRow.add( geometryVertices );

	container.add( geometryVerticesRow );

	// faces

	var geometryFacesRow = new UI.Panel();
	var geometryFaces = new UI.Text().setColor( '#444' ).setFontSize( '12px' );

	geometryFacesRow.add( new UI.Text( 'Faces' ).setWidth( '90px' ).setColor( '#666' ) );
	geometryFacesRow.add( geometryFaces );

	container.add( geometryFacesRow );

	// parameters

	var parameters;


	//

	function update() {

		var geometry = editor.selected.geometry;

		geometry.uuid = geometryUUID.getValue();
		geometry.name = geometryName.getValue();

	}

	function build() {

		var object = editor.selected;

		if ( object && object.geometry ) {

			var geometry = object.geometry;

			container.setDisplay( 'block' );

			objectType.setValue( getGeometryInstanceName( object.geometry ) );

			updateFields( geometry );

			//

			if ( parameters !== undefined ) {

				container.remove( parameters );
				parameters = undefined;

			}

			if ( geometry instanceof THREE.PlaneGeometry ) {

				parameters = new Sidebar.Geometry.PlaneGeometry( signals, object );
				container.add( parameters );

			} else if ( geometry instanceof THREE.CubeGeometry ) {

				parameters = new Sidebar.Geometry.CubeGeometry( signals, object );
				container.add( parameters );

			} else if ( geometry instanceof THREE.CylinderGeometry ) {

				parameters = new Sidebar.Geometry.CylinderGeometry( signals, object );
				container.add( parameters );

			} else if ( geometry instanceof THREE.SphereGeometry ) {

				parameters = new Sidebar.Geometry.SphereGeometry( signals, object );
				container.add( parameters );

			} else if ( geometry instanceof THREE.IcosahedronGeometry ) {

				parameters = new Sidebar.Geometry.IcosahedronGeometry( signals, object );
				container.add( parameters );

			} else if ( geometry instanceof THREE.TorusGeometry ) {

				parameters = new Sidebar.Geometry.TorusGeometry( signals, object );
				container.add( parameters );

			} else if ( geometry instanceof THREE.TorusKnotGeometry ) {

				parameters = new Sidebar.Geometry.TorusKnotGeometry( signals, object );
				container.add( parameters );

			}

		} else {

			container.setDisplay( 'none' );

		}

	}

	signals.objectSelected.add( build );
	signals.objectChanged.add( build );

	//

	function updateFields( geometry ) {

		geometryUUID.setValue( geometry.uuid );
		geometryName.setValue( geometry.name );

		if ( geometry instanceof THREE.Geometry ) {

			geometryVertices.setValue( geometry.vertices.length );
			geometryFaces.setValue( geometry.faces.length );

		} else if ( geometry instanceof THREE.BufferGeometry ) {

			geometryVertices.setValue( geometry.attributes.position.numItems / 3 );
			geometryFaces.setValue( geometry.attributes.index.numItems / 3 );

		}

	}

	function getGeometryInstanceName( geometry ) {

		for ( var key in geometryClasses ) {

			if ( geometry instanceof geometryClasses[ key ] ) return key;

		}

	}

	return container;

}
