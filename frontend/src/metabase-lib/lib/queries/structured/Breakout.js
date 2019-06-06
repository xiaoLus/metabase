/* @flow */

import MBQLClause from "./MBQLClause";

import type { Breakout as BreakoutObject } from "metabase/meta/types/Query";
import type StructuredQuery from "../StructuredQuery";
import type Dimension from "../../Dimension";

export default class Breakout extends MBQLClause {
  /**
   * Replaces the breakout in the parent query and returns the new StructuredQuery
   * or replaces itself in the parent query if no {breakout} argument is provided.
   */
  replace(breakout?: Breakout | BreakoutObject): StructuredQuery {
    if (arguments.length > 0) {
      return this._query.updateBreakout(this._index, breakout);
    } else {
      return this._query.updateBreakout(this._index, this);
    }
  }

  /**
   * Adds itself to the parent query and returns the new StructuredQuery
   */
  add(): StructuredQuery {
    return this._query.addBreakout(this);
  }

  /**
   * Removes the breakout in the parent query and returns the new StructuredQuery
   */
  remove(): StructuredQuery {
    return this._query.removeBreakout(this._index);
  }

  /**
   * Returns the display name for the breakout
   */
  displayName(): ?string {
    const dimension = this.dimension();
    return dimension && dimension.displayName();
  }

  /**
   * Predicate function to test if a given breakout clause is valid
   */
  isValid(): boolean {
    const query = this.query();
    return !query || query.breakoutOptions(this).hasDimension(this.dimension());
  }

  /**
   * Returns the breakout's dimension
   */
  dimension(): Dimension {
    return this._query.parseFieldReference(this);
  }
}
